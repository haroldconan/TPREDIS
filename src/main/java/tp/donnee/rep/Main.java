package tp.donnee.rep;

import java.util.Map;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisShardInfo;

public class Main {
	public static void main(String[] args) throws Exception {
		Jedis jedis = null;
		try {
			String redisHost = "redis-12402.c9.us-east-1-2.ec2.cloud.redislabs.com";
			int redisPort = 12402;
			String redisPassword = "nantes";
			String key = "customer";

			JedisShardInfo shardInfo = new JedisShardInfo(redisHost, redisPort);
			shardInfo.setPassword(redisPassword);
			jedis = new Jedis(shardInfo);
			jedis.connect();
			System.out.println("Connection Successful");
			jedis.hset(key, "nom", "conan");
			if (jedis.exists(key)) {
				Map<String, String> map = jedis.hgetAll(key);
				for (Map.Entry<String, String> entry : map.entrySet())
					System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
			} else {
				System.out.println("Existe Pas !!!");
			}

		} catch (Exception e) {
			System.out.println(e);
		}
		if (jedis != null)
			jedis.close();
	}

}
