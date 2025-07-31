const selectors = require("./selectors");
const Command = require('leadfoot/Command');
const pollUntil = require('leadfoot/helpers/pollUntil');



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
        }
    }

    const select = await session.findByXpath(selectors.type_conge);
    const options = await select.findAllByTagName("option");
    for (let o of options)
    {
        const value = await o.getAttribute("value");
        if (value ==="cp")
        {
            await o.click();
            break;
        }
    }

    const certif = await session.findByXpath(selectors.checkbox);
    await certif.click();

    const valider = await session.findByCssSelector(selectors.valider);
    await valider.click();

    await new Command(session)
        .then(pollUntil(function(){
            const element = document.querySelector("#confirmation-message");
            return element && window.getComputedStyle(element).display !== "none" ? true : null
        ;}, [], 3000));

    const msg = await session.findByCssSelector(selectors.p);
    console.log(await msg.getVisibleText());
}

module.exports = fillForm;