// file for the OOP version of XML_String


// How it works!
// ====
// -create Root XML tag
// -create standardXML() tags
// -add them to the selected Variable
// -remove or replace inner Tag Data
// -search for specific Tag Data


class XMLString{
    constructor(rootForXML) {
        this.rootForXML = rootForXML;
    }

    singleXMLString = [];


    // ================================
    // basic for creating XML string
    // in either:
    // string
    // array
    standardXML(tag, inner, stringMe) {

        if (typeof(inner) == 'object') {
            console.error("Inner Data as been idenitfied as an Object!\nMake sure to use JSON.Stringify!");
        }

        var tmpXMLString = [];
        if(tag){
            tmpXMLString[0] = '<' + tag + '>';
            tmpXMLString[1] = inner;
            tmpXMLString[2] = '</' + tag + '>';
        }else if(tag==""){
            tmpXMLString[0] = inner;

        }
        if (stringMe == 'string') {
            console.log('Now a String');
            return tmpXMLString.join('');
        }
        if (stringMe == 'array') {
            console.log('Already Array')
            return tmpXMLString;
        }
        console.error('No last argument. Didn\'t know how to format');
    }


    // ================================
    // add after id
    addToXMLString(tag, inner, beforeAfterWithin, searchTerm) {
        // !!!!IMPORTANT!!!!! - first step to making XML String
        // that adds to pre-existing XMLstring
        var madeUpXML = this.standardXML(tag, inner, 'string');
        this.bigJoin();
        this.bigSplit();
        console.log("madeUpXML", madeUpXML);

        // ================================
        // option to place me 1 before or 1 after a searced term
        this.searchIt(searchTerm);
        if (beforeAfterWithin == 'before') {
            try {
                this.singleXMLString.splice(this.indexArray[0] - 1, 0, madeUpXML);
            } catch (err) {
                console.error(err);
            }
        }
        if (beforeAfterWithin == 'after') {
            try {
                this.singleXMLString.splice(this.indexArray[1] + 1, 0, madeUpXML);
            } catch (err) {
                console.error(err);
            }
        }

        if (beforeAfterWithin == 'within') {
            try {
                this.singleXMLString.splice(this.indexArray[0] + 1, 0, madeUpXML);
            } catch (err) {
                console.error(err);
            }
        }


        // ================================

        // this.singleXMLString.splice(1, 0, madeUpXML);

        this.bigJoin();
        this.bigSplit();

        console.log('singleXMLstring', this.singleXMLString);
        return this.singleXMLString;
    }

    // ================================

    // 2  that JOIN & SPLIT
    bigJoin() {
        try {
            this.singleXMLString = this.singleXMLString.join('');
        } catch (err) {
            console.log(err + ' --- Join already applied');
        }
        return this.singleXMLString;
    }
    bigSplit() {
        try {
            this.singleXMLString = this.singleXMLString.split(/(?<=>)|(?=<)/g);
        } catch (err) {
            console.log(err + ' --- Split already applied+');
        }
        return this.singleXMLString;
    }


    // ================================
    // make your base root XML Tags
    makeRoot(rootName) {
        var rooted = [];
        rooted[0] = '<' + rootName + '>';
        rooted[1] = '</' + rootName + '>';

        this.singleXMLString = rooted;

        return rooted;
    }
    // ================================

    changeInner(searchTerm, newInner) {
        this.indexArray = [];
        this.bigJoin();
        this.bigSplit();

        this.searchIt(searchTerm);

        var holdingIndex = this.indexArray[0];

        console.log("holding:", holdingIndex);

        this.singleXMLString[holdingIndex + 1] = newInner;

        console.log(this.singleXMLString);
    }

    // ================================

    removeBySearch(searchTerm, removeMoreThanOne) { // to remove an item from Array
        this.indexArray = [];

        this.bigJoin();
        this.bigSplit();

        this.searchIt(searchTerm);
        var hodlingForRemovalIndex = this.indexArray;

        console.log('holding:', hodlingForRemovalIndex);


        // only precede if: [1]-[0] >= 2
        if (removeMoreThanOne == false && hodlingForRemovalIndex[1] - hodlingForRemovalIndex[0] <= 3) {
            console.log('Removing...');
            this.singleXMLString.splice(hodlingForRemovalIndex[0], 1);
            this.singleXMLString.splice(hodlingForRemovalIndex[0], 1);
            this.singleXMLString.splice(hodlingForRemovalIndex[0], 1);
            console.log('Removed!');
        } else {
            console.error('You have selected only a 3 part Tag - to be remove. If this is the desired effect, redo command with "False" as 2nd parameter');
        }
        // return;

        // console.table(this.singleXMLString);

        if (removeMoreThanOne == true) { // deleting the range from search for deleting
            for (var i = hodlingForRemovalIndex[0]; i <= hodlingForRemovalIndex[1]; i++) {

                console.log('I\'m erasing from here ', hodlingForRemovalIndex[0], 'to here: ', hodlingForRemovalIndex[1]);

                this.singleXMLString.splice(hodlingForRemovalIndex[0], 1);
            }
        }
    }


    removeByIndex(index, range) { // simple method that erase a range (indicated by the parameter)

        this.bigJoin();
        this.bigSplit();

        for (var i = 0; i < range; i++) {
            this.singleXMLString.splice(index, 1);
            console.log('Erased at ', index);
        }
        this.printXML();
    }
    // ==================================

    spliceIntoXML(whatToAdd, whereToAdd) {
        this.singleXMLString.splice(whereToAdd, 0, whatToAdd)
        console.log(this.singleXMLString);
    };


    // ================================

    indexArray = []; // holding indexes to be used in 'changeInner()'
    pairedArray = []; //to hold the pairs of ranges to be used
    rangeStr = ""; //holds the string of the Range - between pairedArray[0] & pairedArray[1]
    searchIt(search, multipair) {

        // to search within the array that is XML
        // returning all Array <elements> within <range> of XML

        // dumps FOUND indexes into 'indexArray' (global) - can be used anywhere

        this.indexArray = [];

        this.bigJoin();
        this.bigSplit();

        var endIt = true;

        for (var i = 0; i < this.singleXMLString.length; i++) { // debugger;
            if (this.singleXMLString[i] == '<' + search + '>') {
                console.log('Found you!!! --- at index', i);
                this.indexArray.push(i);
                // debugger;
                endIt = true;
                for (var ii = i; endIt == true; ii++) { // debugger;
                    if (this.singleXMLString[ii] == '</' + search + '>') {
                        console.log('end of search!: ', ii);

                        this.indexArray.push(ii);
                        endIt = false;
                    }
                    // i=ii;
                    // debugger;
                }
            }
        }
        // var pulledOutArray = [];
        // for (var j = this.indexArray[0]; j <= this.indexArray[1]; j++) {
        //     console.log(j);
        //     pulledOutArray.push(this.singleXMLString[j]);

        // }

        // console.log(pulledOutArray);

        // input: 2 4 14 16
        // ouput: [2, 4], [14, 16]


        this.pairedArray = [];
        var ii = 0;
        for (var i = 0; i < this.indexArray.length; i++) {
            console.log('i ', i);
            ii = i;
            ii++;
            this.pairedArray.push([
                this.indexArray[i], this.indexArray[ii]
            ]);
            i++;
        }

        console.log('this.pairedArray ', this.pairedArray);

        if (this.pairedArray.length > 1 && multipair > 0) {
            console.error('Multiple pairs found, redo search with desired Range Paramater, eg. 1 Or 2 or 3...');
        } else {
            console.log(this.pairedArray[multipair-1]);
        }

        // var rangeStr = this.singleXMLString[this.indexArray[0]] + this.singleXMLString[this.indexArray[0]+1] + this.singleXMLString[this.indexArray[1]]; 
        this.rangeStr = "";
        for(var i=this.indexArray[0]; i<=this.indexArray[1]; i++){
            this.rangeStr += (this.singleXMLString[i]);
        }

        this.rangeStr = this.rangeStr.split(/(?<=>)|(?=<)/g);
        console.log('this.rangeStr ', this.rangeStr);

        console.log('this.pairedArray ', this.pairedArray[multipair-1]);
        return this.pairedArray[multipair-1];
    }

    //================================
    searchForParticalMatch(searchTerm, searchingStr){
        //finds the text within text
        //eg - time | timer 
        //run | runner
        var reg = ("/^.*"+searchingStr+".*$/g");
    
        var found = reg.match(searchTerm);
        return found;    
    }

    
    //================================

    foundArray = []; foundArrayIndexes=[]; returnedMiddleSearch = [];
    searchTagsInXMLString(searchTerm){
        //searching through items of XMLSring by using REGex from this.searchForParticalMatch()
        //eg
        //email1, email2, email3, email4
        //search 'email' = will return all values within
      
        this.foundArray = []; this.foundArrayIndexes=[];
            
        this.bigJoin(); this.bigSplit();
        this.singleXMLString.forEach((item, index)=>{
            this.foundArray.push(this.searchForParticalMatch(searchTerm, item));
            console.log('item', item); 
        });

        var j=0;
        for(var i=0; i<this.singleXMLString.length; i++){
            if(this.foundArray[i]!=null){
                this.foundArrayIndexes.push(i);
                // console.log('j', j); 
                // this.returnedMiddleSearch.push(this.foundArrayIndexes[j])
                // debugger;
            }
        }
        for(var i=0; i<this.foundArrayIndexes.length; i++){
            this.returnedMiddleSearch.push(this.singleXMLString[this.foundArrayIndexes[i]+1]);          //realy cool line of code! - takes the Array[indexes of Non-null, from previous For loop], then take those indexes and plug into BIG String
            i++;
            // debugger;
        }
        console.log('returnedMiddleSearch', this.returnedMiddleSearch); 

        // debugger;
        return this.foundArrayIndexes;
    }

    

    // ================================
    parse(str) {
        this.singleXMLString = str;
    }


    // ================================
    // /////////////////////////
    printXML() {
        console.log(this.singleXMLString);
        console.table(this.singleXMLString);
    }


    // /////////////////////////


}


// TODO
// create XML to handle objs
// make standard new XML tags with option to add after first instance of <searched term>
// file for the OOP version of XML_String

// TODO
// create XML to handle objs
// make standard new XML tags with option to add after first instance of <searched term>
