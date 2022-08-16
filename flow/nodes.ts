import { Node } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';

export default [
    {
        id: "0",
        type: 'newSimpleData',
        data: { simpleData: new SimpleData(), args: {}, errorMessage: null },
        position: { x: 0, y: 0 },
    }
] as Node[];
