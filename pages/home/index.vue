<template>
   <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{ name: 'profile', params: { username: article.author.username}}">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
            <nuxt-link class="author" :to="{ name: 'profile', params: { username: article.author.username}}">
              {{article.author.username}}
            </nuxt-link>
              <!-- <a href="" class="author">Eric Simons</a> -->
              <span class="date">{{ article.createdAt }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: article.favorited}">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: { slug: article.slug }
          }" href="" class="preview-link">
            <h1>{{article.title}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <nav>
          <ul class="pagination">
            <li class="page-item" v-for="item in totalPage" :key="item" :class="{active: item===page}">
              <nuxt-link class="page-link"
              :to="{
                name: 'home',
                query: {
                  page: item
                }
              }"
              >
                {{item}}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a href="" class="tag-pill tag-default">programming</a>
            <a href="" class="tag-pill tag-default">javascript</a>
            <a href="" class="tag-pill tag-default">emberjs</a>
            <a href="" class="tag-pill tag-default">angularjs</a>
            <a href="" class="tag-pill tag-default">react</a>
            <a href="" class="tag-pill tag-default">mean</a>
            <a href="" class="tag-pill tag-default">node</a>
            <a href="" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import {getArticles} from '@/api/article'
export default {
  name: 'HomePage',
  async asyncData({query}) {
    const page = +query.page || 1;
    const limit = 20
    const {data} = await getArticles({
      limit,
      offset: (page-1) * limit
    });
    console.log(data)
    return {
      ...data,
      limit,
      page
    }
  },
  watchQuery: ['page'],
  computed: {
    totalPage () {
      return  Math.ceil(this.articlesCount / this.limit)
    }
  }

}
</script>