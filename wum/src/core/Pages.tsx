const MaxItemsPerPage = 8;

export type Page = {
    indices: number[]
};

export type PageContainer = {
    pages: Page[],
    page: number,
};

export function useMapping < T > (elements: T[]): number[] {
    return elements.map((val, i) => i);
}

export function useCompareDevice(column: any, reverse: boolean = false, binary = false) {
    const greater = reverse ? -1 : 1;
    if(binary)
        return (a: any, b: any) => {
            if(column(a) === false && column(b) === true)
                return -greater;
            if(column(a) === true && column(b) === false)
                return greater;
            return 0;
        };
    return column instanceof Function ? (a: any, b: any) => {
        if (column(a) < column(b))
            return -greater;
        if (column(a) > (column(b)))
            return greater;
        return 0;
    } : (a: any, b: any) => {
        if (a[column] < b[column])
            return -greater;
        if (a[column] > b[column])
            return greater;
        return 0;
    };
}

export function useSortedMapping < T > (elements: T[], callback: (a: T, b: T) => number) {
    return useMapping(elements).sort((a, b) => callback(elements[a], elements[b]));
}

export function usePages < T > (indices: number[], step: number = MaxItemsPerPage): Page[] {
    const size = indices.length;
    const pageCount = Math.floor(size / step) + (size % step > 0 ? 1 : 0);
    var pages: Page[] = [];
    for (var i = 0; i < pageCount; i++) {
        const startIndex = i * pageCount;
        const items = indices.slice(startIndex, Math.max(size, startIndex + (pageCount - 1)));
        pages.push({
            indices: items
        });
    }
    return pages;
}

export function useMapper < T, T2 = any > (content: T[], pc: PageContainer, mapper: (e: T) => T2): any {
    if (pc.pages.length > 0 && pc.page >= 0 && pc.page < pc.pages.length) {
        return pc.pages[pc.page].indices.map(i => mapper(content[i]));
    }
}

export function useUnmapper<T, T2>(content: T2[]) {
    return (i: number) => content[i];
}

export function useTargetUnmapper<T>(content: any[], accessor: T) {
    const unmap = useUnmapper(content);
/*
export type Accessor<D extends object> = (
    originalRow: D,
    index: number,
    sub: {
        subRows: D[];
        depth: number;
        data: D[];
    },
) => CellValue;
*/
    return (i: number) => {
        return {
            originalRow: accessor instanceof Function ? accessor(unmap(i)) : unmap(i)[accessor],
            index: i,
            sub: { subRows: [], depth: 0, data: []}
        }
    }
}

export class PageContext {

    _container: PageContainer;

    constructor(pc: PageContainer) {
        this._container = pc;
    }

    unwrap(): PageContainer {
        return this._container;
    }

    next(): PageContext {
        this._container.page += 1;
        this._container.page = Math.min(this._container.page + 1, Math.max(0, this._container.pages.length - 1));
        return this;
    }

    previous(): PageContext {
        this._container.page = Math.min(this._container.page - 1, Math.max(0, this._container.pages.length - 1));
        return this;
    }

    begin(): PageContext {
        this._container.page = 0;
        return this;
    }

    end(): PageContext {
        this._container.page = Math.max(0, this._container.pages.length - 1);
        return this;
    }
};

export default function usePageContext(pc: PageContainer): PageContext {
    return new PageContext(pc);
}