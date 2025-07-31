const selectors = require("./selectors");


async function fillForm(session)
{
    await session.get("http://127.0.0.1:5500/leadfoot-exo1/Doc_offi/Exo24/page-demande.html");

    const input_texts = await session.findAllByXpath(selectors.input_text);
    const input_date = await session.findAllByXpath(selectors.input_date);
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
            console.log(id+" : "+data[id]);
        }
    }

    const data1 = {
        "date-debut" :"01/01/2001",
        "date-fin" :"01/01/2002"
    };
    for (let i of input_date)
    {
        const id = await i.getAttribute("id");
        if (data1[id])
        {
            await i.clearValue();
            await i.type(data1[id]);
            console.log(id+" : "+data1[id]);
        }
    }
}

module.exports = fillForm;