export default interface Batch {
    name: string;
    finished_at: number | null;
    failed_jobs: number;
}
