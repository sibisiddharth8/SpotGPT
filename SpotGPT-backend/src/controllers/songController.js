import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({ error: "Both audio and image files are required." });
        }

        console.log("Audio File:", audioFile);
        console.log("Image File:", imageFile);

        const audioupload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video",
        });
        const imageupload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });

        const duration = `${Math.floor(audioupload.duration/60)} : ${Math.floor(audioupload.duration%60)}`

        const songData = {
            name,
            desc,
            album,
            file: audioupload.secure_url,
            image: imageupload.secure_url,
            duration: audioupload.duration,
        }

        const song = songModel(songData);
        await song.save();


        // Respond with success
        res.status(200).json({success:true, message: "Song added successfully!" });
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ error: error.message });
    }
};

const listSong = async ( req, res ) =>{

}

export {addSong, listSong}