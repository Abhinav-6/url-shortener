<script>
    let org_url = "";
    let short_url = "";
    function randomShortUrl() {
        return crypto.randomUUID().substring(0, 6);
    }
</script>

<form
    class="flex flex-col max-w-80 items-center mx-auto gap-4 py-4 w-full"
    method="post"
>
    <div class="w-full flex flex-col gap-1">
        <label for="url" class="font-semibold">Destination URL</label>
        <input
            required
            on:change={() => {
                if (org_url === "") {
                    short_url = randomShortUrl();
                }
            }}
            name="original_url"
            type="text"
            id="url"
            class="bg-gray-100 border border-slate-900 rounded focus:outline-none focus:border-2 px-2 py-1.5 w-full"
        />
    </div>
    <div class="flex flex-col w-full gap-1">
        <label
            for="short_url"
            class="font-semibold flex justify-between items-center"
            >Short Link <button
                type="button"
                class="font-thin cursor-pointer text-sm"
                on:click={() => {
                    short_url = randomShortUrl();
                }}
            >
                Randomize
            </button></label
        >
        <input
            value={short_url}
            name="short_url"
            type="text"
            id="short_url"
            class="bg-gray-100 border border-slate-900 rounded focus:outline-none focus:border-2 px-2 py-1.5 w-full"
        />
    </div>
    <button
        type="submit"
        class="bg-purple-900 text-white w-full rounded-lg py-2"
        >Create link</button
    >
</form>
