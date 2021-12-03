

async function postRecommendation(req, res) {
    try {
        const { name, youtubeLink } = req.body;

        const { error } = 

    } catch (error) {
        console.log(err);
        return res.sendStatus(500);
    }

}