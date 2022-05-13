import fs from 'fs'
import AWS, { Credentials } from 'aws-sdk'
import formidable from 'formidable'



const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "fra1",
    Credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
})


export const config={
    api:{
        bodyParser: false
    }
}


export default async function handler(req,res){
    const form = formidable();
    form.parse(req,async(err,fields,files)=>{
        if(!files.demo){
            res.status(400).send("No file Uploaded")
            return;
        }
        try{
            return s3Client.putObject({
                Bucket: process.env.DO_SPACES_BUCKET,
                Key: files.demo.originalFilename,
                Body: fs.createReadStream(files.demo.filepath)

            }, async()=>res.status(201).send("File uploaded"));

        }
        catch(e){
            console.log(e);
            res.status(500).send("Error uploading file");
        }
    })
}