d3.json("./static/Resources/samples.json")
  .then(({ names }) => {
    names.forEach(id => {
      d3.select('select').append('option').text(id)
    });

    optionChanged();
  });

  const optionChanged = () => {
    let option = document.querySelector('select').value;

    d3.json('./static/Resources/samples.json').then(({metadata, samples}) =>{
      let meta = metadata.filter(obj => obj.id == option)[0];
      let sample = samples.filter(obj => obj.id == option)[0];

      // Metadata info
      d3.select('.panel-body').html('');
      Object.entries(meta).forEach(([key,val]) => {
        d3.select('.panel-body').append('h4').text(`${key.toUpperCase()}: ${val}`)
      });

      // Bar Chart
      let {otu_ids, sample_values, otu_labels} = sample;

      var data = [
        {
          x: sample_values.slice(0,10).reverse(),
          y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
          text: otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation: 'h'
        }
      ];
      
      Plotly.newPlot('bar', data);


      // Bubble Chart
      var dataBubble = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Viridis'
          }
        }
      ];
  
      var layout =  {
        autosize: false,
        width: 1200,
        height: 500,
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 30,
          pad: 4
        },
        showlegend: false,
    };

  
      Plotly.newPlot('bubble', dataBubble, layout);

      console.log(meta, sample);
    })
  };




