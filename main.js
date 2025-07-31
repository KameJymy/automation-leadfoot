const {Server} = require("@theintern/leadfoot");
const serveur = new Server("hhtp://localhost:50081");
const fillForm = require("./fillForm");

(async() =>{
    const session = await serveur.createSession({browserName:"chrome"});
    try
    {
        await fillForm(session);
    }
    catch(err)
    {
        console.log("Error : "+err.message);
    }
    finally
    {
        await session.quit();
    }
})();