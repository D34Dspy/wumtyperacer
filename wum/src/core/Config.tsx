const Config = {
    backend: 'https://gruppe2.toni-barth.com',
    post: async (api: string, body: Object, onSuccess: (obj: any) => void, onFailure: (obj: any) => void) => {
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(body),
        };
        await fetch(`${Config.backend}${api}`, options)
            .then((response) => response.json())
            .then(onSuccess)
            .catch(onFailure);
    },
    get: async (api: string, onSuccess: (obj: any) => void, onFailure: (obj: any) => void) => {
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        await fetch(`${Config.backend}${api}`, options)
            .then((response) => response.json())
            .then(onSuccess)
            .catch(onFailure);
    },
    delete: async (api: string, onSuccess: (obj: any) => void, onFailure: (obj: any) => void) => {
        const options = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        await fetch(`${Config.backend}${api}`, options)
            .then((response) => response.json())
            .then(onSuccess)
            .catch(onFailure);
    }
}

export default Config;