


async function fillForm(session)
{
    await session.get("http://127.0.0.1:5500/leadfoot-exo1/Doc_offi/Exo24/page-demande.html");
}

module.exports = fillForm;