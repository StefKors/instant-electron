import {db} from "./db.ts";

export function DataList() {
    const {
        error,
        isLoading,
        data,
    } = db.useQuery({users: {}});

    if (error) {
        return <div>error {error.message}</div>
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <pre
            style={{
                textAlign: 'left',
                maxWidth: '100%',
                padding: 12,
                borderRadius: 12,
                overflow: 'scroll',
            }}
        >
          {data?.users ? JSON.stringify(data?.users, null, 2) : 'no objects'}
        </pre>
    );
}