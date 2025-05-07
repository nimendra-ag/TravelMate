import React from 'react'

const UserProfile = () => {
    return (
        <>
            <div style={{ marginTop: "90px" }}>
                <div>
                    <img src="https://picsum.photos/200/200" class="mx-auto d-block" style={{ borderRadius: '100px' }} alt="..." />
                </div>
                <div className="container" style={{ marginTop: "50px", marginBottom:"200px", backgroundColor: '#2C2C2C', padding: '20px', borderRadius: '8px' }}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" />
                        </div>
                        <div className="col-12">
                            <label for="inputAddress" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>

                        <div className="mb-3">
                            <label for="formFile" class="form-label">Update Your Profile Picture</label>
                            <input className="form-control" type="file" id="formFile"/>
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label for="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" for="gridCheck">
                                    Check me out
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-danger">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile