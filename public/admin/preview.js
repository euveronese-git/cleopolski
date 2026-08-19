(function () {
  var h = window.h;
  var createClass = window.createClass;

  function data(entry, key) {
    var value = entry.getIn(['data', key]);
    if (value === undefined || value === null) {
      value = entry.get(key);
    }
    return value;
  }

  function toPlain(value) {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }
    if (typeof value.toJS === 'function') {
      return value.toJS();
    }
    return String(value);
  }

  function firstImage(entry, getAsset) {
    var images = data(entry, 'images');
    if (!images) return '';
    var first = typeof images.get === 'function' ? images.get(0) : images[0];
    if (!first) return '';
    if (typeof first !== 'string') {
      if (first && typeof first.get === 'function') {
        first = first.get('image') || first.get('url') || first.get('src') || '';
      } else if (first && typeof first === 'object') {
        first = first.image || first.url || first.src || '';
      } else {
        first = String(first);
      }
    }
    if (!first) return '';
    if (/^https?:\/\//i.test(first) || first.indexOf('/uploads/') === 0 || first.indexOf('/brand/') === 0) {
      return first;
    }
    try {
      var asset = getAsset(first);
      return asset ? asset.toString() : first;
    } catch (err) {
      return first;
    }
  }

  function formatBRL(value) {
    var n = Number(value);
    if (!isFinite(n)) return 'R$ 0';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(n);
  }

  function categoryLabel(category) {
    if (category === 'aluguel') return 'Aluguel';
    if (category === 'lancamento') return 'Lançamento';
    return 'Venda';
  }

  var PropertyPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var getAsset = this.props.getAsset;
      var title = String(toPlain(data(entry, 'title')) || '');
      var price = toPlain(data(entry, 'price'));
      var image = firstImage(entry, getAsset);
      var incomplete = !title || price === '' || price == null;

      if (incomplete) {
        return h(
          'div',
          { className: 'preview-wrap' },
          h('p', { className: 'preview-label' }, 'Prévia do anúncio'),
          h(
            'div',
            { className: 'preview-empty' },
            'Preencha título e preço para ver o anúncio como no site.'
          )
        );
      }

      var category = String(toPlain(data(entry, 'category')) || 'venda');
      var code = String(toPlain(data(entry, 'code')) || '');
      var badge = String(toPlain(data(entry, 'featuredBadge')) || '');
      var neighborhood = String(toPlain(data(entry, 'neighborhood')) || '');
      var address = String(toPlain(data(entry, 'address')) || '');
      var bedrooms = toPlain(data(entry, 'bedrooms')) || 0;
      var bathrooms = toPlain(data(entry, 'bathrooms')) || 0;
      var parking = toPlain(data(entry, 'parkingSpaces')) || 0;
      var area = toPlain(data(entry, 'areaSqM')) || 0;
      var condoFee = Number(toPlain(data(entry, 'condoFee')) || 0);
      var place = neighborhood || address || 'Endereço';

      var badges = [
        h('span', { className: 'pcard-badge', key: 'cat' }, categoryLabel(category)),
      ];
      if (badge) {
        badges.push(h('span', { className: 'pcard-badge pcard-badge-gold', key: 'feat' }, badge));
      }

      var mediaChildren = [
        image
          ? h('img', { src: image, alt: title, referrerPolicy: 'no-referrer' })
          : h('div', { className: 'pcard-media-ph' }, 'Adicione uma foto'),
        h('div', { className: 'pcard-grad' }),
        h('div', { className: 'pcard-badges' }, badges),
      ];
      if (code) {
        mediaChildren.push(h('span', { className: 'pcard-code' }, code));
      }
      mediaChildren.push(h('div', { className: 'pcard-heart' }, '♡'));
      mediaChildren.push(
        h(
          'div',
          { className: 'pcard-price-row' },
          h(
            'div',
            {},
            h(
              'span',
              { className: 'pcard-price-kicker' },
              category === 'aluguel' ? 'Valor Mensal' : 'Valor de Venda'
            ),
            h(
              'p',
              { className: 'pcard-price' },
              formatBRL(price),
              category === 'aluguel' ? h('span', {}, ' /mês') : null
            )
          ),
          condoFee
            ? h('span', { className: 'pcard-condo' }, 'Cond: R$ ' + condoFee)
            : null
        )
      );

      return h(
        'div',
        { className: 'preview-wrap' },
        h('p', { className: 'preview-label' }, 'Prévia do anúncio no site'),
        h(
          'article',
          { className: 'pcard' },
          h('div', { className: 'pcard-media' }, mediaChildren),
          h(
            'div',
            { className: 'pcard-body' },
            h(
              'div',
              {},
              h('div', { className: 'pcard-loc' }, h('span', {}, '📍 ' + place)),
              h('h3', { className: 'pcard-title' }, title),
              h(
                'div',
                { className: 'pcard-metrics' },
                h(
                  'div',
                  { className: 'pcard-metric' },
                  h('strong', {}, String(bedrooms)),
                  h('small', {}, 'Qts')
                ),
                h(
                  'div',
                  { className: 'pcard-metric' },
                  h('strong', {}, String(bathrooms)),
                  h('small', {}, 'Banh')
                ),
                h(
                  'div',
                  { className: 'pcard-metric' },
                  h('strong', {}, String(parking)),
                  h('small', {}, 'Vagas')
                ),
                h(
                  'div',
                  { className: 'pcard-metric' },
                  h('strong', {}, String(area)),
                  h('small', {}, 'm²')
                )
              )
            ),
            h(
              'div',
              { className: 'pcard-actions' },
              h('div', { className: 'pcard-btn pcard-btn-ghost' }, 'Ver Detalhes'),
              h('div', { className: 'pcard-btn pcard-btn-wa' }, 'Tenho Interesse')
            )
          )
        )
      );
    },
  });

  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewTemplate('properties', PropertyPreview);
})();
