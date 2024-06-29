// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

_createEmails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

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
    getLoggedInUser,
}

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status) {
                switch (filterBy.status) {
                    case 'inbox':
                        mails = mails.filter(mail => mail.from !== loggedinUser.email && mail.removeAt === null)
                        break
                    case 'draft':
                        mails = mails.filter(mail => mail.sentAt === null)
                        break
                    case 'trash':
                        mails = mails.filter(mail => mail.removeAt !== null)
                        break
                    case 'sent':
                        mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt !== null)
                        break
                    case 'stared':
                        mails = mails.filter(mail => mail.isStared === true)
                        break
                    default:
                        break
                }
            }
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            // if (filterBy.lables) {
            //     mails = mails.filter(mail => mail.lables === filterBy.lables)
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
        id: '',
        subject: '',
        body: '',
        isRead: null,
        sentAt: null,
        removeAt: null,
        from: loggedinUser.email,
        to: '',
        lables: [],
    }
}

function getLoggedInUser() {
    return loggedinUser
}

function getDefaultFilter() {
    return {
        status: '',
        subject: '',
        isRead: null,
        isStared: null,
        lables: [],
    }
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
    return {
        ...filterBy
    }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.status !== undefined) filterBy.status = filterBy.status
    if (filterBy.txt !== undefined) filterBy.txt = filterBy.txt
    if (filterBy.isRead !== undefined) filterBy.isRead = filterBy.isRead
    if (filterBy.isStared !== undefined) filterBy.isStared = filterBy.isStared
    if (filterBy.lables !== undefined) filterBy.lables = filterBy.lables
    return filterBy
}

function _createEmails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 10; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(3),
                body: utilService.makeLorem(50),
                isRead: Math.random() > 0.7,
                isStared: Math.random() > 0.7,
                sentAt: Date.now(),
                removeAt: null,
                from: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
                to: `user@appsus.com`,
                lables: [],
            }
            mails.push(mail)
        }
        for (let i = 0; i < 10; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(3),
                body: utilService.makeLorem(50),
                isRead: true,
                isStared: Math.random() > 0.7,
                sentAt: Date.now(),
                removeAt: null,
                from: `user@appsus.com`,
                to: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
                lables: [],
            }
            mails.push(mail)
        }
        storageService.saveToStorage(MAIL_KEY, mails)
        console.log('mails', mails)
    }
}