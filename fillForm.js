const selectors = require("./selectors");


async function fillForm(session)
{
    await session.get("http://127.0.0.1:5500/leadfoot-exo1/Doc_offi/Exo24/page-demande.html");

    const input_texts = await session.findAllByXpath(selectors.input_text);
    const data = {
        prenom : "Jean",
        nom:"Dujardin",
        email:"jean@gmail.com"
    };
    for (let i of input_texts)
    {
        const id = await i.getAttribute("id");
        if (data[id])
        {
            await i.clearValue();
            await i.type(data[id]);
            console.log(id +" : "+data[id]);
        }
    }
}

module.exports = fillForm;