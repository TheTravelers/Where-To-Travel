module.exports = {
    addDestination: async( req, res ) => {
        const db = req.app.get('db')
        const {user_id} = req.params;
        const {city_name, population, waterfront, adult_friendly, family_friendly} = req.body;
        try {
            const addedDest = await db.add_destination(user_id, city_name, population, waterfront, adult_friendly, family_friendly)

            return res.status(200).send(addedDest)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(501)
        }
    },
    deleteDestination: async ( req, res ) => {
        const db = req.app.get('db')
        const {dest_id} = req.params;

        try{
            await db.delete_destination(dest_id)

            return res.sendStatus(200)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(501)
        }
    },
    getDestinations: async ( req, res ) => {
        const db = req.app.get('db')
        const {user_id} = req.params;

        try{
            const userDestList = await db.get_user_destinations(user_id)

            return res.status(200).send(userDestList)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(501)
        }
    }

}