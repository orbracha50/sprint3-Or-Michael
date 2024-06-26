// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

_createEmails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.title) {
            //     const regex = new RegExp(filterBy.title, 'i')
            //     mails = mails.filter(mail => regex.test(mail.title))
            // }
            // if (filterBy.price) {
            //     mails = mails.filter(mail => mail.listPrice.amount >= filterBy.price)
            // }
            return mails
        })
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getEmptyEmail() {
    return {

    }
}

function getFilterFromSearchParams(searchParams) {
    // return Object.fromEntries(searchParams)
    const title = searchParams.get('title') || ''
    const price = searchParams.get('price') || ''
    return {
        title,
        price
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

function _createEmails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 10; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(5),
                body: utilService.makeLorem(50),
                isRead: Math.random() > 0.7,
                sentAt: Date.now(),
                removeAt: null,
                from: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
                to: `user@appsus.com`,
            }
            mails.push(mail)
        }
        storageService.saveToStorage(MAIL_KEY, mails)
        console.log('mails', mails)
    }
}