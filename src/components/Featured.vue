<template>
  <div>
    <div id="services__section" class="container-fluid">
        <p id="services__section__title">Featured Services</p>
        <ul id="services__items" class="grid text-center">
            <li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">Professional Wall Painting</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li>
            <li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">House Plumbing</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li>
            <li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">Math Tutor</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li>
            <li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">Loan Mowing</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li>
            <li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">Professional Photography</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li><li class="services_item">
                <div class="services__item__top">
                    <div class="services__item__top__img img-thumbnail"></div>
                    <p class="services__item__top__title">TV Mounting</p>
                    <p class="services__item__top__doer">By: Peter Winston</p>
                    <a href="#" class="services__item__top__read">Read More ></a>
                </div>
                <hr>
                <div class="services__item__bottom">
                    <div class="services__item__bottom__work__hour">2hr</div>
                    <p class="services__item__bottom__price">ksh: 500</p>
                    <button class="services__item__bottom__book__btn">Book Now</button>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
  name: 'FeaturedVue',
  props: {
   
  }
}
</script>


<style>
a {
    text-decoration: none;
    color: #000;
}

li {
    list-style: none;
}

#services__section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

#services__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
}

#services__section__title {
    font-size: 50px;
    width: 100%;
    text-align: center;
}

.services__item__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.services__item__top__img {
    border: none;
}

.services__item__top__img:nth-child(1) {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-image: url('./imagesFEATURED/workman-with-his-arms-crossed.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.services_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 0.25rem;
    padding: 1rem;
    background-color: #d5e4d8;
}

hr {
    width: 100%;
    height: 2px;
    background-color: #fff;
}

.services__item__bottom__book__btn {
    background-color: #3d5a23;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    color: #fff;
}

</style>