<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";

    // The slug is accessed via $page.params.slug
    const slug = $page.params.slug;

    async function getUrl() {
        try {
            let response = await fetch(
                `${import.meta.env.VITE_PUBLIC_API_URL}/url/${slug}`
            );
            console.log(response);
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                if (browser && window.location.href !== data.original_url) {
                    window.location.href = data.original_url;
                }
                return data;
            } else {
                throw new Error("No link found.");
            }

            // Check if the browser is already at the original_url to prevent a loop
        } catch (error) {
            // console.error("Fetch error:", error);
            throw error;
            // Handle the error appropriately
        }
    }
</script>

{#await getUrl()}
    <p class="text-center">Redirecting...</p>
{:then data}
    <!-- Render data or perform other actions -->
{:catch error}
    <p class="text-center">Error: {error.message}</p>
{/await}
