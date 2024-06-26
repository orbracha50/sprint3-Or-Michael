// note service
// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import {  asyncStorageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()
export const NoteService = {
    query,
    get,
    remove,
    save,
    getNextBookId,
    getEmptyBook,
    getFilterBy,
    setFilterBy,
    getFilterFromSearchParams,
    getGenerStats,
    getPriceStats
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
         
            if (filterBy.txt) {

                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                console.log(notes)
                notes = notes.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}
function getDefaultFilter() {
    return { txt: '', minPrice: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}
function getPriceStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByPriceMap = _getBookCountByPriceMap(books)
            console.log(bookCountByPriceMap)
            const data = Object.keys(bookCountByPriceMap).map(priceName => ({ title: priceName, value: Math.round((bookCountByPriceMap[priceName] / bookCountByPriceMap.all) * 100) }))
            return data
        })

}

function getGenerStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByGenerMap = _getBookCountByGenerMap(books)
            const data = Object.keys(bookCountByGenerMap)
                .map(gener =>
                ({
                    title: gener,
                    value: Math.round((bookCountByGenerMap[gener] / books.length) * 100)
                }))
            return data
        })
}
function _getBookCountByPriceMap(books) {
    const carCountBySpeedMap = books.reduce((map, book) => {
        if (book.amount < 40) {
            map.cheap++
            map.all++
        }
        else if (book.amount < 70) {
            map.all++
            map.regular++
        } else {
            map.expensive++
            map.all++
        }
        return map
    }, { cheap: 0, regular: 0, expensive: 0, all: 0 })
    return carCountBySpeedMap
}

function _getBookCountByGenerMap(books) {
    const carCountByVendorMap = books.reduce((map, book) => {
        if (!map[book.gener]) map[book.gener] = 0
        map[book.gener]++
        return map
    }, {})
    return carCountByVendorMap
}
function getEmptyBook() {
    return {
        id: "",
        title: "",
        description: '',
        pageCount: 0,
        thumbnail: "",
        amount: 10,
        reviews: [],
        listPrice: {
            currencyCode: "",
            isOnSale: false
        }
    }

}
function addNo(book) {
    const url = URL + book
    const data = axios.get(url)
        .then(data => data = data.data.items)
    return data
}
function getFilterBy() {
    return { ...filterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) filterBy.txt = filterBy.txt
    if (filterBy.minPrice !== undefined) filterBy.minPrice = filterBy.minPrice
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(car => car.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!',
                    title: 'testing'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1652341068/EducationHub/photos/ocean-waves.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
    }

    storageService.saveToStorage(NOTE_KEY, notes)
}