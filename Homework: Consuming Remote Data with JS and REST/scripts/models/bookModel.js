define([], function (){
        function Book(title, author, isbn, tags, id){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
            this.tags = tags;
            this._id = id;
        }

        return Book;
});