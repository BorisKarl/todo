class Storage {
    constructor(object)
    {
        this.object = object;
    }

    setStorage = () => {
        localStorage.setItem(this.object.title, JSON.stringify(this.object));
    }

    getStorage = () => {
        return localStorage.getItem(JSON.parse(this.object.title));
    }

    deleteStorage = () => {
        localStorage.removeItem(this.object.title);
    }
}




export { Storage }
