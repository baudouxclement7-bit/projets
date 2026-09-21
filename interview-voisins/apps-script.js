function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var row = [
    new Date().toLocaleString('fr-FR'),
    data.prenom || '',
    data.nom || '',
    data.profession || '',
    data.secteur || '',
    data.secteur_autre || '',
    data.description || '',
    data.taches || '',
    data.repetitif || '',
    Array.isArray(data.outils) ? data.outils.join(', ') : (data.outils || ''),
    data.outil_autre || '',
    data.documents || '',
    data.perte_temps || '',
    data.problemes || '',
    data.relances || '',
    Array.isArray(data.comm) ? data.comm.join(', ') : (data.comm || ''),
    data.emails_type || '',
    data.decisions || '',
    data.deleguer || '',
    Array.isArray(data.capacites) ? data.capacites.join(', ') : (data.capacites || ''),
    data.niveau_ia || '',
    data.interet || '',
    data.recontact || '',
    data.contact || ''
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
