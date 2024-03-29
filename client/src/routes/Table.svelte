<script>
    // import { BASE_URL } from "$env/static/public";
    const base_url = import.meta.env.VITE_PUBLIC_BASE_PATH;
    // const base_url = env.BASE_URL;
    // console.log(base_url);
    /**
     * @type {Iterable<any> | ArrayLike<any>}
     */
    export let data = [];
</script>

<div class="w-full absolute overflow-auto">
    <table
        class="table-fixed w-full border overflow-x-scroll min-w-[1024px] max-w-screen-lg mx-auto"
    >
        <thead class="w-full">
            <tr class="bg-white text-left">
                <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r border-b border-gray-400"
                >
                    Created At
                </th>
                <td
                    class="px-6 py-4 border-r border-b border-gray-400 text-left"
                    >Original url
                </td>
                <td
                    class="px-6 py-4 border-r border-b border-gray-400 text-left"
                    >Short url
                </td>
                <td
                    class="px-6 py-4 border-r border-b border-gray-400 text-left"
                >
                    Clicks
                </td>
            </tr>
        </thead>
        <tbody class="w-full">
            {#each Array.from(data) as d}
                <tr class="bg-white border-r border-b border-gray-400">
                    <td
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r border-b border-gray-400 text-left"
                    >
                        {new Date(d.createdAt).toLocaleDateString()}
                        {new Date(d.createdAt).toLocaleTimeString()}
                    </td>
                    <td
                        class="px-6 py-4 border-r border-b border-gray-400 text-left"
                    >
                        <a href={d.original_url} target="_blank"
                            >{d.original_url}</a
                        >
                    </td>
                    <td
                        class="px-8 py-4 border-r border-b border-gray-400 text-left break-words text-wrap"
                    >
                        <a href={`${base_url}${d.short_url}`} target="_blank"
                            >{base_url}{d.short_url}</a
                        >
                    </td>
                    <td
                        class="px-6 py-4 border-r border-b border-gray-400 text-left"
                    >
                        {d.click}
                    </td>
                </tr>
            {/each}</tbody
        >
    </table>
</div>
