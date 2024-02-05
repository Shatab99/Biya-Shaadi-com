import axios from "axios";
import useBiodata from "../../Hooks/useBiodata";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const EditBiodata = () => {
    const {biodata}= useBiodata()
    const {user}= useContext(AuthContext)
    const handleUpdate = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const gender = form.gender.value
        const motherName = form.motherName.value
        const fatherName = form.fatherName.value
        const profile_pic = form.photo.value
        const dob = form.dob.value
        const height = form.height.value
        const weight = form.weight.value
        const age = form.age.value
        const occupation = form.occupation.value
        const phone = form.phone.value
        const partnerAge = form.partnerAge.value
        const partnerHeight = form.partnerHeight.value
        const contactEmail = form.contactEmail.value
        const presentDivision = form.presentDivision.value
        const race = form.race.value
        const division = form.division.value
        const updateForm = {
            name, motherName, fatherName, profile_pic, dob,height, weight, age, occupation,race , division, gender, phone, partnerAge, partnerHeight,
            contactEmail, presentDivision
        }
        console.log(updateForm)
        axios.patch(`http://localhost:5000/members/biodata/${user.email}`, updateForm)
        .then(res=>{
            console.log(res.user)
            Swal.fire({
                title: "Bio Data Updated Successfully !!",
                imageUrl: "https://cdn.dribbble.com/users/129972/screenshots/3964116/75_smile.gif",
                imageWidth: 400,
                imageHeight: 300,
                imageAlt: "Custom image"
              });
              form.reset();
        })
    }

    return (
        <div className="px-12 mb-8">
            <Helmet><title>Edit Biodata</title></Helmet>
            <h1 className="text-2xl font-semibold mb-8">Update Your Biodata :</h1>
            <form onSubmit={handleUpdate} className="bg-slate-200 p-5 border-2 rounded-xl flex flex-col items-center gap-y-5">
                <div className="flex flex-col w-full lg:flex-row gap-5">
                    <input defaultValue={biodata.name} type="text" placeholder="name" name="name" className="input input-bordered input-error w-full " required />
                    <select name="gender" className="select select-bordered w-full max-w-xs" required>
                        <option disabled selected>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="w-full flex gap-5">
                    <input name="motherName" type="text" placeholder="Mother's Name" className="input input-bordered input-error w-full " required/>
                    <input name="fatherName" type="text" placeholder="Fathers Name" className="input input-bordered input-error w-full " required />
                </div>
                <div className="flex flex-col w-full lg:flex-row gap-5 ">
                    <input defaultValue={biodata.profile_pic} name="photo" type="text" placeholder="Photo Url" className="input input-bordered input-error w-full "  required/>
                    <input name="phone" type="number" defaultValue='+880' placeholder="Your Phone Number" className="input input-bordered input-error w-full "  required/>
                </div>
                <div className="w-full">
                    <p className="font-semibold mb-2">Date Of Birth</p>
                    <input type="date" name="dob" placeholder="" className="input input-bordered input-error w-full " required/>
                </div>
                <div className="w-full flex gap-5">
                    <input name="height" type="number" placeholder="Height in cm" className="input input-bordered input-error w-full " required/>
                    <input name="weight" type="number" placeholder="Weight in kg" className="input input-bordered input-error w-full " required/>
                </div>
                <div className="w-full flex gap-5">
                    <input name="age" type="number" placeholder="Age" className="input input-bordered input-error w-full " required/>
                    <input name="occupation" type="text" placeholder="Profeission" className="input input-bordered input-error w-full " required/>
                </div>
                <div className="w-full flex gap-5">
                    <input name="race" type="text" placeholder="Race ??" className="input input-bordered input-error w-full " required/>
                    <select name="division" className="select select-bordered w-full max-w-xs" required>
                        <option disabled selected>Division That You live</option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Khulna</option>
                        <option>Rajshahi</option>
                        <option>Khulna</option>
                        <option>Sylhet</option>
                        <option>Mymensingh</option>
                    </select>
                </div>
                <div className="w-full flex gap-5">
                    <input name="partnerAge" type="number" placeholder="Partner Age" className="input input-bordered input-error w-full " required/>
                    <select name="presentDivision" className="select select-bordered w-full max-w-xs" required>
                        <option disabled selected>Present Division You live</option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Khulna</option>
                        <option>Rajshahi</option>
                        <option>Khulna</option>
                        <option>Sylhet</option>
                        <option>Mymensingh</option>
                    </select>
                </div>
                <div className="w-full flex gap-5">
                    <input name="partnerHeight" type="number" placeholder="Partner height in cm (expected)" className="input input-bordered input-error w-full " required/>
                    <input name="contactEmail" type="email" placeholder="Your Contact Email" className="input input-bordered input-error w-full " required/>
                    
                </div>
                
                <input type="submit" className="btn btn-wide bg-[#FE5D63] text-white hover:text-black" value="Update Biodata" />
            </form>
        </div>
    );
};

export default EditBiodata;