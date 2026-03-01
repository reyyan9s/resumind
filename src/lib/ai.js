const ENDPOINT = "/api/rewrite"

/**
 * Rewrites/generates a professional executive summary securely via the backend proxy.
 * @param {{ name: string, role: string, experience: Array, skills: Array, summary: string }} data
 * @returns {Promise<string>}
 */
export async function rewriteSummary(data) {
    const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
    })

    if (!res.ok) {
        let errMsg = `HTTP ${res.status}`
        try {
            const err = await res.json()
            errMsg = err?.error || err?.message || errMsg
        } catch (_) { }
        throw new Error(errMsg)
    }

    const json = await res.json()
    return json.result || ""
}
