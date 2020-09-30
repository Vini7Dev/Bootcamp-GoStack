import ICacheProvider from "../model/ICacheProvider";

interface ICacheData {
    [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
    private cachesData: ICacheData = {};

    public async save(key: string, value: any): Promise<void> {
        this.cachesData[key] = JSON.stringify(value);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cachesData[key];

        if(!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cachesData[key];
    }

    public async invalidadePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cachesData).filter(key => key.startsWith(`${prefix}:`));

        keys.forEach(key => {
            delete this.cachesData[key];
        });
    }
}

export default FakeCacheProvider;