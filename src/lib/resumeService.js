import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
    getDoc,
    setDoc,
} from "firebase/firestore"
import { db } from "./firebase"

const RESUMES_COL = "resumes"

/**
 * Subscribe to all resumes for a given user.
 * @param {string} userId
 * @param {(resumes: Array) => void} callback
 * @returns unsubscribe function
 */
export function getUserResumes(userId, callback) {
    const q = query(
        collection(db, RESUMES_COL),
        where("userId", "==", userId)
    )
    return onSnapshot(q, (snapshot) => {
        const resumes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        // Sort by updatedAt descending client-side (avoids composite index requirement)
        resumes.sort((a, b) => {
            const aTime = a.updatedAt?.seconds ?? 0
            const bTime = b.updatedAt?.seconds ?? 0
            return bTime - aTime
        })
        callback(resumes)
    })
}

/**
 * Create a new resume document for a user.
 * @param {string} userId
 * @param {object} data - initial resume data
 * @returns {Promise<string>} - the new document ID
 */
export async function createResume(userId, data = {}) {
    const defaultData = {
        userId,
        name: "Untitled Resume",
        role: "",
        email: "",
        phone: "",
        summary: "",
        experience: [],
        education: [],
        skills: [],
        templateId: "minimalist",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...data,
    }
    const docRef = await addDoc(collection(db, RESUMES_COL), defaultData)
    return docRef.id
}

/**
 * Fetch a single resume by ID.
 * @param {string} resumeId
 * @returns {Promise<object|null>}
 */
export async function getResume(resumeId) {
    const snap = await getDoc(doc(db, RESUMES_COL, resumeId))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() }
}

/**
 * Update a resume document.
 * @param {string} resumeId
 * @param {object} data
 */
export async function updateResume(resumeId, data) {
    const ref = doc(db, RESUMES_COL, resumeId)
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

/**
 * Delete a resume document.
 * @param {string} resumeId
 */
export async function deleteResume(resumeId) {
    await deleteDoc(doc(db, RESUMES_COL, resumeId))
}

/**
 * Create or update a user profile document in /users/{uid}
 * @param {string} uid
 * @param {object} data
 */
export async function upsertUserProfile(uid, data) {
    await setDoc(doc(db, "users", uid), data, { merge: true })
}

/**
 * Fetch user profile from /users/{uid}
 * @param {string} uid
 * @returns {Promise<object|null>}
 */
export async function getUserProfile(uid) {
    const snap = await getDoc(doc(db, "users", uid))
    if (!snap.exists()) return null
    return snap.data()
}
