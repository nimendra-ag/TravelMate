import { NewsletterEmailModel } from "../models/NewsletterMail.js";

const AddNewsletterMail = async (req, res) => {
    try {
        // console.log(req.body);
        const NewsletterEmail = new NewsletterEmailModel({
            name: req.body.name,
            email: req.body.email
        });
        
        await NewsletterEmail.save();
        res.json({ success: true });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

export { AddNewsletterMail };
