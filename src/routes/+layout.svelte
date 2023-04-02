<script>
    import "bulma/css/bulma.css";
    import Header from "$lib/header.svelte";
    import Footer from "$lib/footer.svelte";
    import "../styles.scss";
  </script>
  
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
  
  <style lang="SCSS"></style>
  