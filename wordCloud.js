// https://github.com/benoitvallon/100-best-books/blob/master/books.json

fetch("./books.json")
    .then((res) => {
        return res.json();
    })
    .then((mydata) => {
        // console.log(mydata);
        anychart.onDocumentReady(function () {
            var data = [];
            for (let i = 0; i < mydata.length; i++) {
                // x to set words
                var title = mydata[i].title;

                // value to set frequencies
                var page = mydata[i].pages;

                // category to set categories
                var category = mydata[i].language;

                data.push({ "x": title, "value": page, "category": category })
            }
            console.log("data=", data);


            // create a chart and set the data
            var chart = anychart.tagCloud(data);

            // set a chart title
            chart.title("Word Cloud");


            // set an array of angles at which the words will be laid out
            // chart.angles([0, 45, -45]);
            chart.angles([0, -90]);
            // chart.anglesCount(6);


            // set text spacing
            chart.textSpacing(4);

            // set the container id
            chart.container("wordCloud");
            // initiate drawing the chart
            chart.draw();


            var wordNormal = chart.normal();
            wordNormal.fontFamily('arial');
            wordNormal.fontWeight(600);

            var wordHover = chart.hovered();
            wordHover.fontSize(80);
            wordHover.stroke('black');

            var wordSelect = chart.selected();
            wordSelect.fill('Green');
            wordSelect.fontWeight('bold');


            // create and configure a color scale.
            var customcolor = anychart.scales.linearColor();
            // customcolor.colors('brown', 'YellowGreen', 'olive', 'DarkGreen', 'SaddleBrown');
            customcolor.colors('#8d5932', 'black', '#857600', '#827717', '#e65100', '#37474f', '#7b8030', '#ffa000', '#482311')

            // set the color scale as the color scale of the chart
            chart.colorScale(customcolor);

            /*
            // enable a color range
            chart.colorRange(true);

            // set the color range length
            chart.colorRange().length('90%');
            */

            // add an event listener to link elements of a Tag Cloud to web pages
            chart.listen("pointClick", function (e) {
                var url = "//en.wikipedia.org/wiki/" + e.point.get("x");
                window.open(url, "_blank");
            });

            /*
            // create an event listener for the pointsHover event
            chart.listen("pointsHover", function (e) {
                document.body.style.cursor = "pointer";

            });
            */
        })


    })

    .catch(err => console.error(err));
