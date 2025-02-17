import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";




const ManageRooms = () => {


    const getPublicIdFromUrl = (url) => {
        const splitUrl = url.split('/');
        const publicIdWithExtension = splitUrl[splitUrl.length - 1];
        return publicIdWithExtension.split('.')[0];
    };

    const deleteImagesFromMongo = async (images) => {



        try {
            console.log("Deleted from Mongo", images);
            const response = await axios.delete("http://localhost:3000/hotels/deleteroomimage", {
                data: { images }
            });
        } catch (e) {
            console.log(e);
        }

    };



    const deleteImagesFromCloudinary = async (publicIds) => {
        const deletedResults = [];

        for (const publicId of publicIds) {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const apiKey = "798218248754595";
            const apiSecret = "8q9WAeXqTlrZkl0wVDJsn6BLAts"; // Get this from your Cloudinary dashboard

            // Generate signature
            const signature = generateSignature(publicId, apiSecret, timestamp);

            const formData = new FormData();
            formData.append("public_id", publicId);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dqbkxghlh/image/destroy",
                    formData
                );

                if (response.status === 200) {
                    console.log(response);

                    deletedResults.push({
                        publicId,
                        status: "deleted"
                    });
                }
            } catch (error) {
                deletedResults.push({
                    publicId,
                    status: "failed",
                    error: error.message
                });
            }
        }
        return deletedResults;
    };

    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [initialImages, setInitialImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);


    const generateSignature = (publicId, apiSecret, timestamp) => {

        const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        return CryptoJS.SHA1(str).toString();
    };




    const uploadImagesToCloudinary = async (files) => {
        const uploadedUrls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "preset-for-file-upload");
            formData.append("cloud_name", "dqbkxghlh");

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
                formData
            );

            if (response.status === 200) {
                uploadedUrls.push(response.data.secure_url);
            }
        }
        return uploadedUrls;
    };


    const navigate = useNavigate();
    const location = useLocation();
    const hotelData = location.state?.accommodationDetails;

    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [editedRoom, setEditedRoom] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        console.log("initialImages changed:", initialImages);
    }, [initialImages]);

    const handleEdit = (room) => {
        console.log("handleEdit called with room:", room);
        console.log("room.images before setting:", room.images);
        
        setSelectedRoom(room);
        setEditedRoom(room);
        setShowModal(true);
        setInitialImages(prev => {
            console.log("Previous initialImages:", prev);
            console.log("Setting new initialImages:", room.images);
            return room.images;
        });
        setSelectedImages(room.images);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleSave = async () => {


        let publicIdsToDelete = [];

        for (const url of imagesToRemove) {
            let pid = getPublicIdFromUrl(url);
            publicIdsToDelete.push(pid);
        }

        console.log(publicIdsToDelete);

        const deleted = await deleteImagesFromCloudinary(publicIdsToDelete);

        console.log("deleted images", deleted);



        const deleteImages = {
            imagesToRemove,
            hotel: hotelData._id,
            room: selectedRoom.id
        }

        console.log(deleteImages);
        await deleteImagesFromMongo(deleteImages);




        try {

            let tempuploadedImages = [];

            if (editedRoom.imagesToUpload && editedRoom.imagesToUpload.length !== 0) {
                tempuploadedImages = await uploadImagesToCloudinary(editedRoom.imagesToUpload);
            }

            console.log("Uploaded Images:", tempuploadedImages);


            console.log("Initial Images:", initialImages);



            editedRoom.images = [...initialImages, ...tempuploadedImages];







            const uploadedImages = [...initialImages, ...tempuploadedImages];

            editedRoom.images = uploadedImages;


            console.log("Edited Room:", editedRoom);














            const response = await axios.put('http://localhost:3000/hotels/editroom', editedRoom, {

            });

            if (response.status === 200 || response.status === 201) {
                alert('Shape');

                setSelectedImages([]);

            }


            navigate("/hotels");
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // setIsLoading(false);

            handleClose();
        }











    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoom((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));

        setSelectedImages((prev) => [...prev, ...newImageUrls]);

        setEditedRoom((prev) => ({
            ...prev,
            imagesToUpload: [...(prev.imagesToUpload || []), ...files]
        }));
    };

    const handleRemoveImage = (indexToRemove) => {

        let removedImageUrl = initialImages[indexToRemove];


        setImagesToRemove(prev => [...(prev || []), removedImageUrl]);

        setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove));

        setInitialImages((prev) => prev.filter((_, index) => index !== indexToRemove));

        setEditedRoom((prev) => ({
            ...prev,
            imagesToUpload: prev.imagesToUpload?.filter((_, index) => index !== indexToRemove)

        }));
    };

    return (
        <div className="flex justify-content-center items-center" style={{ marginTop: "100px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white">
                                <h2 className="mb-0">{hotelData?.name} - Room Details</h2>
                            </div>

                            <div className="card-body">
                                {loading ? (
                                    <div className="text-center my-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                ) : hotelData?.rooms?.length > 0 ? (
                                    <div className="row">
                                        {hotelData.rooms.map((room) => (
                                            <div key={room.id} className="col-md-6 mb-4">
                                                <div className="card h-100 border-primary">
                                                    <div className="card-header bg-light">
                                                        <h4 className="text-primary mb-0">{room?.name}</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="room-details">
                                                            <div className="mb-3">
                                                                <i className="fas fa-money-bill-wave text-success me-2"></i>
                                                                <span className="fw-bold">Price per night:</span> ${room?.price}
                                                            </div>
                                                            <div className="mb-3">
                                                                <i className="fas fa-users text-info me-2"></i>
                                                                <span className="fw-bold">Capacity:</span> {room?.capacity}{" "}
                                                                {room.capacity > 1 ? "persons" : "person"}
                                                            </div>
                                                            <div className="mb-3">
                                                                <i className="fas fa-door-open text-warning me-2"></i>
                                                                <span className="fw-bold">Total Rooms:</span> {room?.total}
                                                            </div>
                                                            <div className="mb-3">
                                                                <i className="fas fa-star text-danger me-2"></i>
                                                                <span className="fw-bold">Grade:</span> {room?.grade}
                                                            </div>
                                                            <div>
                                                                <i className="fas fa-calendar-check text-success me-2"></i>
                                                                <span className="fw-bold">Current Bookings:</span>{" "}
                                                                {room?.bookings?.length}
                                                            </div>
                                                            <div>
                                                                <p className="my-3 mx-2">{room?.description}</p>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary mt-3 w-100" onClick={() => handleEdit(room)}>
                                                            Edit Room
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center my-5">
                                        <h4 className="text-muted">No rooms available for this hotel.</h4>
                                    </div>
                                )}
                                <button className="btn btn-primary mt-3 w-100" onClick={() => navigate("/add-room", { state: hotelData.id })}>
                                    Add New Room
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Room Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={editedRoom.name || ""}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price per Night</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={editedRoom.price || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                name="capacity"
                                value={editedRoom.capacity || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Total Rooms</label>
                            <input
                                type="number"
                                className="form-control"
                                name="total"
                                value={editedRoom.total || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Grade</label>
                            <select className="form-control" name="grade" value={editedRoom.grade || ""} onChange={handleInputChange}>
                                <option value="">Select Grade</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>

                        {/* Image Upload Section */}
                        <div className="mb-3">
                            <label className="form-label">Room Images</label>
                            <div className="mb-2 d-flex flex-wrap gap-2">
                                {selectedImages && selectedImages.length > 0 ? (
                                    selectedImages.map((image, index) => (
                                        <div key={index} className="position-relative">
                                            <img
                                                src={image}
                                                alt={`Room Image ${index + 1}`}
                                                className="img-thumbnail"
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                onClick={() => handleRemoveImage(index)}
                                                style={{ margin: "2px" }}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>

                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No images uploaded.</p>
                                )}
                            </div>
                            <input type="file" className="form-control" name="images" accept="image/*" multiple onChange={handleImageUpload} style={{ color: "transparent" }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageRooms;