import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getPrevBookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    getCurrencyCode,
}

function query(filterBy = {}) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return asyncStorageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return asyncStorageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return asyncStorageService.put(BOOK_KEY, book)
    } else {
        return asyncStorageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0, thumbnail = '', description = utilService.makeLorem(150), currencyCode = 'ILS', isOnSale = false) {
    return {
        id: '',
        title,
        thumbnail,
        description,
        listPrice: {
            amount: price,
            currencyCode,
            isOnSale
        }
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: 0
    }
}

function getFilterBy() {
    return {
        ...filterBy
    }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) filterBy.title = filterBy.title
    if (filterBy.price !== undefined) filterBy.price = filterBy.price
    return filterBy
}

function getNextBookId(bookId) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function getPrevBookId(bookId) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            let prevBookIdx = books.findIndex(book => book.id === bookId) - 1
            if (prevBookIdx < 0) prevBookIdx = books.length -1
            return books[prevBookIdx].id
        })
}

function _createBooks() {
    let books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const currency = ['ILS', 'USD', 'EUR']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(4),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1),
                    utilService.makeLorem(1),
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(150),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `${i+1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: currency[utilService.getRandomIntInclusive(0, currency.length - 1)],
                    isOnSale: Math.random() > 0.7
                },
                reviews: [],
            }
            books.push(book)
        }
        storageService.saveToStorage(BOOK_KEY, books)
        console.log('books', books)
    }
}


function getCurrencyCode(code) {
    switch (code) {
        case 'USD':
            return '$'

        case 'ILS':
            return '₪'

        case 'EUR':
            return '€'

    }
}