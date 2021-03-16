# XMLString
My simplified concept of XML - from Array to String and backwards



How it Works:
  - Declare a Variable (of the class instance)
  `var myXML = new XMLString();`
  
  
  - Next, make a root Tag for the String  
  `myXML.makeRoot('MyReadme')`
  
  
  - Add XMLStrings to the Root String  
  `myXML.addToXMLString('tagName', 'insideData', '*', '**')`
    
  - \*-for the placing of the Tag, before/after/within
  The idea being, how do you want the new XML string to be added to your XML String
  
  
  - \*\*-the Tag to search for, once found will be added to
  
  
  
  
  
Other mentionaliables

  - `myXML.changeInner('tagToChange', 'what you want to change it too')`
  - `myXML.removeBySearch(searchTerm, removeMoreThanOne)`
  - `myXML.removeByIndex(index, range)`
  - `myXML.searchIt(search)`
  - `myXML.printXML()`
  
  
  
  

 
  
