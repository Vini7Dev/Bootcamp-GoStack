import { container } from 'tsyringe';

import ICacheProvider from './model/ICacheProvider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
    redis: container.resolve(RedisCacheProvider)
};

container.registerInstance<ICacheProvider>(
    'CacheProvider',
    providers.redis
);