import { model } from 'mongoose';
const NewsletterEmailModel = model('NewsletterEmail',{
    email:{
        type: String,
        required: true
    }, 
    name:{
        type: String,
        required: true
    },
})

export  {NewsletterEmailModel};