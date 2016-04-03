
    function solve() {
        Function.prototype.extends = function (parent) {
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        };

        var Item = (function () {
            var currentId = 0;

            function Item(name, description) {
                this.description = description;
                this.name = name;
                this.id = currentId++;
            }

            Object.defineProperties(Item.prototype, {
                description: {
                    get: function () {
                        return this._description;
                    },
                    set: function (description) {
                        if (typeof(description) != 'string' || description === '') {
                            throw new Error('Description should be a non-empty string');
                        }

                        this._description = description;
                    }
                },
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (name) {
                        if (typeof(name) != 'string' || !(name.length >= 2 && name.length <= 40)) {
                            throw new Error('Name should be a string with length between 2 and 40 characters, inclusive');
                        }

                        this._name = name;
                    }
                }
            });

            return Item;
        })();

        var Book = (function () {
            var ISBN_REGEXP_PATTERN = /^([0-9]{13}|[0-9]{10})$/;

            function Book(name, isbn, genre, description) {
                Item.call(this, name, description);
                this.isbn = isbn;
                this.genre = genre;
            }

            Book.extends(Item);
            Object.defineProperties(Book.prototype, {
                isbn: {
                    get: function () {
                        return this._isbn;
                    },
                    set: function (isbn) {
                        if (!(ISBN_REGEXP_PATTERN.test(isbn))) {
                            var x = !(ISBN_REGEXP_PATTERN.test(isbn));
                            throw new Error('Isbn should be a string with length exactly 10 or 13, can contain only digits.');
                        }

                        this._isbn = isbn;
                    }
                },
                genre: {
                    get: function () {
                        return this._genre;
                    },
                    set: function (genre) {
                        if (typeof(genre) != 'string' || !(genre.length >= 2 && genre.length <= 20)) {
                            throw new Error('Genre should be a string with length between 2 and 20 characters, inclusive');
                        }

                        this._genre = genre;
                    }
                }
            });

            return Book;
        })();

        var Media = (function () {
            function Media(name, rating, duration, description) {
                Item.call(this, name, description);
                this.duration = duration;
                this.rating = rating;
            }
            Media.extends(Item);
            Object.defineProperties(Media.prototype, {
                duration: {
                    get: function () {
                        return this._duration;
                    },
                    set: function (duration) {
                        if (typeof(duration) != 'number' || duration <= 0) {
                            throw new Error('Duration should be non-negative number');
                        }

                        this._duration = Number(duration);
                    }
                },
                rating: {
                    get: function () {
                        return this._rating;
                    },
                    set: function (rating) {
                        if (typeof(rating) != 'number' || !(rating >= 1 && rating <= 5)) {
                            throw new Error('Rating should be a number between 1 and 5, inclusive');
                        }

                        this._rating = Number(rating);
                    }
                }
            });

            return Media;
        })();

        var Catalog = (function () {
            var currentId = 0;

            function Catalog(name) {
                this.name = name;
                this.items = [];
                this.id = currentId++;
            }

            Object.defineProperties(Catalog.prototype, {
                name: {
                    get: function () {
                        return this._name;
                    },
                    set: function (name) {
                        if (typeof(name) != 'string' || !(name.length >= 2 && name.length <= 40)) {
                            throw new Error('Name should be a string with length between 2 and 40 characters, inclusive');
                        }

                        this._name = name;
                    }
                }
            });

            Catalog.prototype.add = function add(items) {
                if (arguments.length === 1) {
                    if (arguments[0] instanceof Array) {
                        var containsNonItemElement = false;
                        arguments[0].forEach(function (item) {
                            if (!(item instanceof Item)) {
                                containsNonItemElement = true;
                            }
                        });
                        if (containsNonItemElement || arguments[0].length === 0) {
                            throw new Error('Array is empty or any of the items is not an Item instance or not an Item-like object');
                        } else {
                            this.items.concat(arguments[0]);
                        }
                    } else if (items instanceof Item) {
                        this.items.push(arguments[0]);
                    } else {
                        throw new Error('Wrong item type passed');
                    }
                } else if (arguments.length !== 0) {
                    var containsNonItemElement = false;
                    for (var argument in arguments) {
                        if (!(argument instanceof Item)) {
                            containsNonItemElement = true;
                            break;
                        }
                    }
                    if (containsNonItemElement) {
                        throw new Error('Any of the items is not an Item instance or not an Item-like object');
                    } else {
                        for (var item in arguments) {
                            this.items.push(item);
                        }
                    }
                } else {
                    throw new Error('No items are passed');
                }
            };

            Catalog.prototype.find = function find(searchValue) {
                if (typeof(searchValue) != 'object') {
                    if (typeof(searchValue) != 'number') {
                        throw new Error('No arguments are passed or id is not a number');
                    }
                    var foundItem = this.items.find(function (item) {
                        return item.id === searchValue;
                    });

                    if (!foundItem) {
                        return null;
                    }
                    return foundItem;
                } else {
                    var i, shouldGet,
                        keys = Object.keys(searchValue)
                        , resultArray;
                    resultArray = this.items.filter(function (item) {
                        shouldGet = false;
                        //console.log(item);
                        for (i = 0; i < keys.length; i++) {
                            if (item[keys[i]] === searchValue[keys[i]]) {
                                shouldGet = true;
                                break;
                            }
                        }

                        return shouldGet;
                    });

                    return resultArray;
                }
            };

            Catalog.prototype.search = function search(searchPattern) {
                if (typeof(searchPattern) != 'string' || searchPattern.length < 1) {
                    throw new Error('The pattern is a string containing at least 1 character');
                }
                var searchRegExpPattern = new RegExp(searchPattern, 'i');
                var resultArray = this.items.filter(function (item) {
                    return (searchRegExpPattern.test(item['name']) || searchRegExpPattern.test(item['description']));
                });

                return resultArray;
            };

            return Catalog;
        })();

        var BookCatalog = (function () {
            function BookCatalog(name) {
                Catalog.call(this, name);
            }

            BookCatalog.extends(Catalog);

            BookCatalog.prototype.add = function add(book) {
                var containsNonBookElement;
                if (arguments.length === 1) {
                    if (arguments[0] instanceof Array) {
                        containsNonBookElement = false;
                        arguments[0].forEach(function (item) {
                            if (!(item instanceof Book)) {
                                containsNonBookElement = true;
                            }
                        });
                        if (containsNonBookElement || arguments[0].length === 0) {
                            throw new Error('Array is empty or any of the items is not an Book instance or not an Book-like object');
                        }
                    } else if (!(arguments[0] instanceof Book)) {
                        throw new Error('Wrong item type passed');
                    }
                } else if (arguments.length !== 0) {
                    containsNonBookElement = false;
                    for (var argument in arguments) {
                        if (!(argument instanceof Book)) {
                            containsNonBookElement = true;
                            break;
                        }
                    }
                    if (containsNonBookElement) {
                        throw new Error('Any of the items is not an Item instance or not an Item-like object');
                    }
                } else {
                    throw new Error('No items are passed');
                }

                Catalog.prototype.add.call(this, book);
            };

            BookCatalog.prototype.getGenres = function getGenres() {
                var resultArray = [];
                this.items.forEach(function (item) {
                    if (resultArray.indexOf(item.genre.toLowerCase()) === -1) {
                        resultArray.push(item.genre.toLowerCase());
                    }
                });

                return resultArray;
            };

            return BookCatalog;
        })();

        var MediaCatalog = (function () {
            function MediaCatalog(name) {
                Catalog.call(this, name);
            }

            MediaCatalog.extends(Catalog);

            MediaCatalog.prototype.add = function add(media) {
                var containsNonMediaElement;
                if (arguments.length === 1) {
                    if (arguments[0] instanceof Array) {
                        containsNonMediaElement = false;
                        arguments[0].forEach(function (item) {
                            if (!(item instanceof Media)) {
                                containsNonMediaElement = true;
                            }
                        });
                        if (containsNonMediaElement || arguments[0].length === 0) {
                            throw new Error('Array is empty or any of the items is not an Book instance or not an Book-like object');
                        }
                    } else if (!(arguments[0] instanceof Media)) {
                        throw new Error('Wrong item type passed');
                    }
                } else if (arguments.length !== 0) {
                    containsNonMediaElement = false;
                    for (var argument in arguments) {
                        if (!(argument instanceof Media)) {
                            containsNonMediaElement = true;
                            break;
                        }
                    }
                    if (containsNonMediaElement) {
                        throw new Error('Any of the items is not an Item instance or not an Item-like object');
                    }
                } else {
                    throw new Error('No items are passed');
                }

                Catalog.prototype.add.call(this, media);
            };

            MediaCatalog.prototype.getTop = function getTop(count) {
                if(typeof(count) != 'number' || count < 1){
                    throw new Error('Count is not a number or count is less than 1');
                }

                var resultArray = this.items
                    .sort(function (a, b) {
                        return a.rating - b.rating;
                    })
                    .map(function (item) {
                        return {
                            id: item.id,
                            name: item.name
                        };
                    });

                return resultArray.slice(0, count);
            };

            MediaCatalog.prototype.getSortedByDuration = function getSortedByDuration() {
                var resultArray = this.items
                    .sort(function (a, b) {
                        if (b.duration - a.duration === 0) {
                            return a.id - b.id;
                        } else {
                            return b.duration - a.duration;
                        }
                    });

                return resultArray;
            };

            return MediaCatalog;
        })();

        return {
            getItem: function(name, description){
                return new Item(name, description);
            },
            getCatalog: function(name){
                return new Catalog(name);
            },
            getBook: function (name, isbn, genre, description) {
                return new Book(name, isbn, genre, description)
            }
            ,
            getMedia: function (name, rating, duration, description) {
                return new Media(name, rating, duration, description)
            }
            ,
            getBookCatalog: function (name) {
                return new BookCatalog(name);
            }
            ,
            getMediaCatalog: function (name) {
                return new MediaCatalog(name);
            }
        };
    }

var module = {};
    module.solve = solve;