import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from 'sweetalert2';
import { Button, Modal } from "bootstrap";

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

const ManageRooms = () => {
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [initialImages, setInitialImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [editedRoom, setEditedRoom] = useState({});
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const hotelData = location.state?.accommodationDetails;

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const getPublicIdFromUrl = (url) => {
        const splitUrl = url.split('/');
        const publicIdWithExtension = splitUrl[splitUrl.length - 1];
        return publicIdWithExtension.split('.')[0];
    };

    const generateSignature = (publicId, apiSecret, timestamp) => {
        const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        return CryptoJS.SHA1(str).toString();
    };

    const deleteImagesFromMongo = async (images) => {
        try {
            await axios.delete("http://localhost:3000/hotels/deleteroomimage", {
                data: { images }
            });
        } catch (error) {
            throw new Error('Failed to delete images from MongoDB');
        }
    };

    const deleteImagesFromCloudinary = async (publicIds) => {
        const deletedResults = [];
        for (const publicId of publicIds) {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const apiKey = "798218248754595";
            const apiSecret = "8q9WAeXqTlrZkl0wVDJsn6BLAts";
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

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setEditedRoom(room);
        setShowModal(true);
        setInitialImages(room.images);
        setSelectedImages(room.images);
        document.body.classList.add('modal-open');
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedRoom(null);
        document.body.classList.remove('modal-open');
    };

    const handleSave = async () => {
        setIsUpdating(true);
        try {
            let publicIdsToDelete = imagesToRemove.map(url => getPublicIdFromUrl(url));
            await deleteImagesFromCloudinary(publicIdsToDelete);

            const deleteImages = {
                imagesToRemove,
                hotel: hotelData._id,
                room: selectedRoom.id
            };
            await deleteImagesFromMongo(deleteImages);

            let tempuploadedImages = [];
            if (editedRoom.imagesToUpload?.length) {
                tempuploadedImages = await uploadImagesToCloudinary(editedRoom.imagesToUpload);
            }

            const uploadedImages = [...initialImages, ...tempuploadedImages];
            editedRoom.images = uploadedImages;

            const response = await axios.put('http://localhost:3000/hotels/editroom', editedRoom);

            if (response.status === 200 || response.status === 201) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Room updated successfully',
                    confirmButtonColor: '#3085d6'
                });
                navigate("/hotels");
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update room details',
                confirmButtonColor: '#d33'
            });
        } finally {
            setIsUpdating(false);
            handleClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoom(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImageUrls = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...newImageUrls]);
        setEditedRoom(prev => ({
            ...prev,
            imagesToUpload: [...(prev.imagesToUpload || []), ...files]
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        const removedImageUrl = initialImages[indexToRemove];
        setImagesToRemove(prev => [...(prev || []), removedImageUrl]);
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
        setInitialImages(prev => prev.filter((_, index) => index !== indexToRemove));
        setEditedRoom(prev => ({
            ...prev,
            imagesToUpload: prev.imagesToUpload?.filter((_, index) => index !== indexToRemove)
        }));
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg " style={{marginTop: '100px'}}>
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">{hotelData?.name} - Room Management</h2>
                </div>

                <div className="card-body">
                    {hotelData?.rooms?.length > 0 ? (
                        <div className="row">
                            {hotelData.rooms.map((room) => (
                                <div key={room.id} className="col-md-6 mb-4">
                                    <div className="card h-100 border-primary">
                                        <div className="card-header bg-light">
                                            <h4 className="text-primary mb-0">{room?.name}</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="room-details">
                                                <p><strong>Price:</strong> ${room?.price}/night</p>
                                                <p><strong>Capacity:</strong> {room?.capacity} persons</p>
                                                <p><strong>Total Rooms:</strong> {room?.total}</p>
                                                <p><strong>Grade:</strong> {room?.grade}</p>
                                                <p><strong>Description:</strong> {room?.description}</p>
                                                
                                                <div className="image-gallery mb-3">
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {room.images?.map((image, index) => (
                                                            <img 
                                                                key={index}
                                                                src={image}
                                                                alt={`Room ${index + 1}`}
                                                                className="img-thumbnail"
                                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                className="btn btn-primary w-100"
                                                onClick={() => handleEdit(room)}
                                            >
                                                Edit Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-5">
                            <h4 className="text-muted">No rooms available</h4>
                        </div>
                    )}
                    
                    <button 
                        className="btn btn-success w-100 mt-3"
                        onClick={() => navigate("/add-room", { state: hotelData.id })}
                    >
                        Add New Room
                    </button>
                </div>
            </div>

            {/* Edit Room Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} 
                 style={{ display: showModal ? 'block' : 'none' }}
                 tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Room Details</h5>
                            <button type="button" 
                                    className="btn-close" 
                                    onClick={handleClose}>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                    <select 
                                        className="form-select"
                                        name="grade"
                                        value={editedRoom.grade || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Grade</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={editedRoom.description || ""}
                                        onChange={handleInputChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Room Images</label>
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {selectedImages?.map((image, index) => (
                                            <div key={index} className="position-relative">
                                                <img
                                                    src={image}
                                                    alt={`Room ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn-close position-absolute top-0 end-0 bg-danger"
                                                    onClick={() => handleRemoveImage(index)}
                                                    style={{ margin: "2px" }}
                                                ></button>
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleClose}
                                disabled={isUpdating}>
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleSave}
                                disabled={isUpdating}>
                                {isUpdating ? (
                                    <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default ManageRooms;