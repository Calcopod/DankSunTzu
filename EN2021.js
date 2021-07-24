const p = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await p.launch()
	const page = await browser.newPage()

	for (let i = 1; i <= 600; i++) {
		await page.goto(`http://evaluare.edu.ro/Evaluare/CandFromJudIAD.aspx?Jud=4&Poz=0&PageN=${i}`)

		// Get the Schools:
		const data = await page.evaluate( () => {
			const rows = Array.from( document.querySelectorAll('table.mainTable tbody tr'))
			const filteredRows = rows.filter( row => row.className )

			return filteredRows.map( row => {
				const items = row.querySelectorAll('td')

				return Array.from(items).map( item => item.innerText )
			} )
		})

		const tableRows = data.map( row => {
			const index = row[0]
			const school = row[3]
			const rom = row[4]
			const math = row[7]
			const avg = row[14]

			const newRow = [index, school, rom, math, avg]
			return newRow;
		});

		// Export to CSV
		// const headers = ['Index', 'School', 'Rom', 'Math', 'Avg']
		let csvContent = ''

		// csvContent += "data:text/csv;charset=utf-8,"
		// csvContent += headers.map( head => head ).join(',') + "\n"
		csvContent += tableRows.map( row => row.join(',')).join('\n') + '\n'

		fs.writeFileSync('./data/EN2021.csv', csvContent, {
		      encoding: "utf8",
		      flag: "a+",
		      mode: 0o666
	    	}, 
	    	(err) => {
				if (err) return console.log(err)
				console.log("Saving to file...")
			} )
	}

	await browser.close()

})()