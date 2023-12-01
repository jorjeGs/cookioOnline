import React, { useState } from 'react';
import LoadingButton from './LoadingButton';
import useUser from '../hooks/useUser';
import { createRecipe } from '../services/recipeService';
import { useNavigate } from 'react-router-dom';

const FormRecipeComponent = () => {
    const { user } = useUser()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //check if the fields are empty
        if (!title || !description || !image) {
            alert('Please fill all the fields');
            return;
        }
        //using a form data object to send the image
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageFile);
        formData.append('created_by_id', user.id);
        formData.append('created_by', user.username);

        //set loading to true
        setLoading(true);

        //call the createRecipe function from the recipeService

        await createRecipe(formData).then((res) => {
            //set loading to fals
            setLoading(false);
            console.log(res);
            setTitle('');
            setDescription('');
            setImage('');
            setImageFile('');
            alert('recipe created');
            //navigate to home
            navigate('/home/feed');
        })

    };

    //show preview of the image
    function mostrarVistaPrevia(event) {
        const input = event.target;

        //also save the image in the state
        setImage(input.value);

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const vistaPrevia = document.getElementById('vista-previa');
                vistaPrevia.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }



    return (
        <>
            <div className='recipe-card bg-[#584022] w-3/4 max-h-fit rounded-2xl mx-auto'>
                <div className='flex flex-row justify-center items-center w-full mt-3'>
                    <h2 className='recipe-title text-yellow-500 text-4xl'><strong>Crear Receta</strong></h2>
                </div>
                <form className='flex flex-col w-full mt-5 px-8' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#694c29] hover:bg-[#73552d]">
                            {
                                image ? <img id="vista-previa" className="w-full h-full object-cover rounded-lg" alt="Vista previa" />
                                    : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-white "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-white ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                            }

                            <input id="image" type="file" className="hidden" value={image} onChange={(e) => { mostrarVistaPrevia(e); setImageFile(e.target.files[0]) }} />
                        </label>
                    </div>
                    <input type="hidden" name="created_by_id" value={user.id} />
                    <input type='hidden' name='created_by' value={user.username} />
                    <div className="flex justify-center items-center mb-6">
                        <LoadingButton style="bg-amber-400 w-60 hover:bg-white text-black font-bold py-2 px-4 rounded-3xl border-2 border-amber-400 hover:border-2 focus:outline-none focus:shadow-outline mt-8" text="Create" onClick={handleSubmit} loading={loading} disabled={loading} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormRecipeComponent;
