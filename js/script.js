$(document).ready(function() {
    // Select the paragraph containing the text
    var paragraph = $('p');
  
    // Get the text of the paragraph and split it into words
    var words = paragraph.text().split(' ');
  
    // Loop through each word and create a dropdown menu with synonyms
    $.each(words, function(index, value) {
      // Create a new <select> element
      var select = $('<select></select>');
  
      // Add options for synonyms to the <select> element
      $.getJSON('https://api.datamuse.com/words?rel_syn=' + value, function(data) {
        $.each(data, function(index, value) {
          select.append('<option value="' + value.word + '">' + value.word + '</option>');
        });
      });
  
      // Wrap the word in a <span> element and append the <select> element to it
      var span = $('<span></span>').text(value + ' ');
      span.append(select);
  
      // Replace the word with the <span> element in the paragraph
      paragraph.html(function(_, html) {
        return html.replace(value + ' ', span.prop('outerHTML'));
      });
    });
  });
  