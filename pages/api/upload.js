// import fs from 'fs'
// import AWS, { Credentials } from 'aws-sdk'
import formidable from 'formidable'

// import {supabase} from '../supabase'
// import { createClient } from '@supabase/supabase-js'
import supabase from "../supabase"


// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL


// // Create a single supabase client for interacting with your database 
// const supabase = createClient(supabaseKey,supabaseUrl)

export default async function handler(req,res){
    const form = formidable();
    form.parse(req,async(err,fields,files)=>{
        console.log(files, fields, err)
        if(!files.image){
            return res.status(400).send("No file Uploaded")
        }
        try{
            const result = await supabase.storage.from(`avatars`).upload(`User${Math.random()*1000}`, files.demo, {
                contentType: "image/*",
                upsert: false
            });
            return res.status(200).json({msg: "image uploaded", res: result.data.Key})
        }
        catch(e){
            console.log(e);
            return res.status(500).send("Error uploading file");
        }
    })
}



