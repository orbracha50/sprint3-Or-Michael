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
    getPriceStats,
    loadImageFromInput
}

function query(filterBy = {}) {

    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.filterBy==='Text') {
                notes = notes.filter(note => note.type === 'NoteTxt')
            }
            if (filterBy.filterBy==='todos') {
                notes = notes.filter(note => note.type === 'NoteTodos')
            }
            if (filterBy.filterBy==='image') {
                notes = notes.filter(note => note.type === 'NoteImg')
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
function loadImageFromInput(imgUrl) {
    console.log(imgUrl)
    const reader = new FileReader()
    
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'nitial value, and they will shrink to fit the container. They shrink because they are using initial flexbox values, including flex-shrink: 1, that allows items to shrink. Using nowrap would cause an overflow if the items were not able to shrink, or could not shrink small enough to fit. Me Baby!',
                    title: 'testing'
                }
            },
            {
                id:  utilService.makeId(),
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
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: 'gray'
                },
                info: {
                    txt: 'shrink to fit the container. They shrink because they are using initial flexbox values, including flex-shrink: 1, that allows items to shrink. Using nowrap would cause an overflow if the items were not able to shrink, or could not shrink small enough to fit.',
                    title: 'testing'
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: 'white'
                },
                info: {
                    txt: ' the items were not able to shrink, or could not shrink small enough to fit.',
                    title: 'lorem'
                }
            },
            
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'orange'
                }
            },
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id:  utilService.makeId(),
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
            },
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'red'
                }
            },
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1652341068/EducationHub/photos/ocean-waves.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'yellow'
                }
            },
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://pixlr.com/images/index/product-image-one.webp',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'lightgreen'
                }
            },
            {
                id: utilService.makeId(),
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
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: 'lightblue'
                },
                info: {
                    txt: 'Fullstack Me Baby!',
                    title: 'testing'
                }
            },
            {
                id:  utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'purple'
                }
            },
        ]
    }

    storageService.saveToStorage(NOTE_KEY, notes)
}
