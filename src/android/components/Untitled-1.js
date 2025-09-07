{headers.map((obj, index) => {
              const date = Object.keys(obj)[0]; // e.g. "08:09"
              const events = obj[date];         // the array of events

        return (
          <View key={index}>
            <View style={styles.dayLabel}>
                <Text style={styles.dayLabelText}>{date}</Text>
            </View>

            {events.map((event) => (
              <Text key={idx} style={styles.labelText} onPress={()=> navigation.navigate('Detalhes',{codEvento: event.codEvento.toString()})} >
              {event.titulo}
            </Text>
            ))}
          </View>
        );
      })}


      <StatusBar 
                backgroundColor="#2a69b9" // Android only
                barStyle="light-content"   // "dark-content" for dark text/icons
              /> 
                  <Text style={styles.labelText}>Todas</Text>
                  <ScrollView style={styles.questionNoImage}>
                    
                  </ScrollView>
                  {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Eventos')}>
              <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>