const request = require("request");
const cheerio = require("cheerio");

const getdata = (req, res) => {
  let data = []
  let countyData = [];
  request({
    method: 'GET',
    url: 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_California'
  }, (err, response, body) => {
    if (err) return console.error(err);
    
    let $ = cheerio.load(body);
    $('.tp-container tbody tr').each((index, el) => {
      if (index < 41 && index > 2) {
        data.push($(el).text());
      }
    })
    for (let i = 0; i < data.length; i++) {
      const county = data[i];
      const datastr = JSON.stringify(county).split('\\n');
      const datas = {
        "county": datastr[1],
        "case": parseInt(datastr[3]),
        "death": parseInt(datastr[5])
      }
      countyData.push(datas);
    }
    return res.json(countyData);
  });
  
}


module.exports = {
  getdata
}