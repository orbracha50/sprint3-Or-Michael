// note service
// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const NOTE_ARCHIVE_KEY = 'noteArchiveDB'
_createNotes()
_createNotesArcive()
export const NoteService = {
    query,
    get,
    remove,
    save,
    getFilterBy,
    getFilterFromSearchParams,
    loadImageFromInput
}

function query(filterBy = {}, page) {
    let key = ''
    if (page === 'notes') key = NOTE_KEY
    if (page === 'archive') key = NOTE_ARCHIVE_KEY
    return asyncStorageService.query(key)
        .then(notes => {
            if (filterBy.title !== '') {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            if (filterBy.category === 'Text') {
                notes = notes.filter(note => note.type === 'NoteTxt')
            }
            if (filterBy.category === 'todos') {
                notes = notes.filter(note => note.type === 'NoteTodos')
            }
            if (filterBy.category === 'image') {
                notes = notes.filter(note => note.type === 'NoteImg')
            }
            return notes
        })
}

function get(noteId, page) {
    let key = ''
    if (page === 'notes') key = NOTE_KEY
    if (page === 'archive') key = NOTE_ARCHIVE_KEY
    return asyncStorageService.get(key, noteId)
}

function remove(noteId, page) {
    let key = ''
    console.log(page)
    if (page === 'notes') key = NOTE_KEY
    if (page === 'archive') key = NOTE_ARCHIVE_KEY
       return asyncStorageService.remove(key, noteId) 
   
    
}

function save(note, page) {
    console.log(page)
    let key = ''
    if (page === 'notes'|| page === 'notesedit' ) key = NOTE_KEY
    if (page === 'archive') key = NOTE_ARCHIVE_KEY
    if (note.id && page === 'notes') {
        return asyncStorageService.post(key, note)
    }
    if(page === 'notesedit'){
        return asyncStorageService.put(key, note)
    }
    if(page === 'archive'){
        console.log('hi')
        return asyncStorageService.post(key, note)
    }
     else{
        return asyncStorageService.post(key, note)
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

function getFilterBy() {
    return { ...filterBy }
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
                id: utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: 'orange'
                }
            },
            {
                id: utilService.makeId(),
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
                id: utilService.makeId(),
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: true,
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
                id: utilService.makeId(),
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
                id: utilService.makeId(),
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
                id: utilService.makeId(),
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

function _createNotesArcive() {
    let notes = storageService.loadFromStorage(NOTE_ARCHIVE_KEY)
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
            }]
    }
    storageService.saveToStorage(NOTE_ARCHIVE_KEY, notes)
}