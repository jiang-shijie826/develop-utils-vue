<template>
  <h2>照片墙</h2>
  <div id="galleryID" class="wall">
    <a v-for="(image, key) in imagesData" :key="key" :href="image.resource_path" :data-pswp-width="image.resource_width"
      :data-pswp-height="image.resource_height" target="_blank" rel="noreferrer">
      <img :src="image.cover_path" alt="" />
    </a>
  </div>
</template>
  
<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  setup() {
    return {
      imagesData: [{
        resource_path:
          'https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        cover_path:
          'https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        resource_width: 1875,
        resource_height: 2500,
      },
      {
        resource_path:
          'https://images.unsplash.com/photo-1687894986595-da703eb96375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        cover_path:
          'https://images.unsplash.com/photo-1687894986595-da703eb96375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        resource_width: 2500,
        resource_height: 1666,
      },
      {
        resource_path:
          'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        cover_path:
          'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        resource_width: 1669,
        resource_height: 2500,
      },
      {
        resource_path:
          'https://images.unsplash.com/photo-1687923069907-8f864b71f72a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        cover_path:
          'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
        resource_width: 2500,
        resource_height: 1666,
      },
      ],
    };
  },
  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#galleryID',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    // queryPhotoWallByTag(1).then((res: any) => {
    //   console.log('wall',res);
    //   if (res.length > 0) {
    //     res.forEach((item: any) => {
    //       imagesData.push(item);
    //     });
    //   }
    // })
    
    // axios.get('/wall/queryByTag/' + tagId).then(data => {
    //   console.log(data.data);
    // });
  },
};
</script>

<style>
.wall {
  width: 200%;
}
</style>
  