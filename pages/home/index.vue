<template>
   <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge and idea of fun.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link
              exact
              :to="{
                name: 'home',
                query: {
                  tab: 'your_feed'
                }
              }"
              :class="{active: tab === 'your_feed'}"
              class="nav-link">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              exact
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }"
              :class="{active: tab === 'global_feed'}"
              class="nav-link" >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link 
                exact
                :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag: tag
                }
              }"
              :class="{active: tab === 'tag'}"
              class="nav-link" >#{{tag}}</nuxt-link>
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
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{ active: article.favorited}"
              :disabled="article.disabled"
              @click="onFavorite(article)"
            >
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: { slug: article.slug }
          }" href="" class="preview-link">
            <h1>{{article.title }}</h1>
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
                  page: item,
                  tag: $route.query.tag,
                  tab: tab
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
            <nuxt-link :to="{
              name: 'home',
              query: {
                tag: item,
                tab: 'tag'
              }
            }"
            v-for="item in tags" :key="item" class="tag-pill tag-default">{{item}}</nuxt-link>
          
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import {getArticles, getFeedArticles, addFavorite, deleteFavorite} from '@/api/article'
import {getTags} from '@/api/tag'
import {mapState} from 'vuex'
export default {
  name: 'HomePage',

  async asyncData({query, store}) {
    const page = +query.page || 1;
    const limit = 20;
    const tag = query.tag;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page-1) * limit,
        tag,
      }),
      getTags() 
    ]);
    const {articles, articlesCount} = articleRes.data;

    const {tags} = tagRes.data 
    // console.log(data)
    
    articles.forEach(article =>article.disabled = false)

    return {
      tags,
      articles,
      articlesCount,
      limit,
      page,
      tag,
      tab,
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return  Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.disabled = true;
      if(article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1

      } else {
        addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1

      }
      article.disabled = false;

    }
  }

}
</script>